# Makefile script to quickly build and run both server
# and client. Just execute "make <command to run>" like
# "make client-build"

client-lint:
	cd client; \
	npm ci; \
	npm run lint-ci

client-build: client-lint
	@echo "CLIENT: Building the client for web..."
	cd client; \
	npm ci; \
	npm run build; \
  cp ./dist/index.html ./dist/404.html
	@echo "CLIENT: Build complete!"

client-run:
	@echo "CLIENT: Running web-server for the client.. "
	cd client; \
	npm ci; \
	npm run dev

