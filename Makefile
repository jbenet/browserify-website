
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
js:


# pages
pages: build/index.html build/modules/index.html build/browser/index.html

build/%.html: src/%.md
	@mkdir -p `dirname $@`
	./render.js < $< > $@

build/CNAME: CNAME
	@mkdir -p `dirname $@`
	cp $< $@
