install:
	npm $@

test:
	npm run $@

format:
	npm run $@

deploy: install test

ship_it: test
	git push
