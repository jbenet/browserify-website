
all: js css static pages

.PHONY: clean test

clean:
	rm -rf -- build

# watching
WATCH=*other/*;static/*;*src/*.md;
watch:
	make
	@echo "[watching $(WATCH) for recompilation]"
	@# for portability, use watchmedo -- pip install watchmedo
	@watchmedo shell-command --patterns="$(WATCH)" --recursive --command='\
		echo; \
		date +"%Y-%m-%d %H:%M:%S"; \
		make' \
		.

# dependencies
deps:
	npm install


# css/less
css: build/static/transformer.min.css

build/static/%.min.css: build/static/%.css
	@mkdir -p `dirname $@`
	@rm -f $@
	cat $< | node_modules/.bin/cssmin > $@

build/static/%.css: other/%.less
	@mkdir -p `dirname $@`
	@rm -f $@
	node_modules/.bin/lessc $< $@

# static
static: $(shell find static -type f | sed 's/^/build\//')

build/static/%: static/% build/CNAME
	@mkdir -p `dirname $@`
	@rm -f $@
	cp $< $@

# js/coffee
js: build/static/bundle.min.js

build/static/%.min.js: build/static/%.js
	node_modules/.bin/uglifyjs $< > $@

build/static/bundle.js: $(shell node_modules/.bin/browserify --list js/web.js)
	@mkdir -p `dirname $@`
	node_modules/.bin/browserify js/web.js -o $@


# pages
pages: build/index.html build/modules/index.html build/browser/index.html

build/%.html: src/%.md other/base.html
	@mkdir -p `dirname $@`
	./render.js < $< > $@

build/CNAME: CNAME
	@mkdir -p `dirname $@`
	cp $< $@
