
build: components index.js
	@component-build --dev

components: component.json
	@component-install --dev --remotes http://localhost:6060

clean:
	rm -rf components build

.PHONY: clean
