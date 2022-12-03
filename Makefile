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

server-build:
	@echo "SERVER: Building the server..."
	cd server; \
	npm ci; \
	npm run build
	@echo "SERVER: Build complete"

server-build-prod:
	@echo "SERVER: Building the server for production..."
	cd server; \
	npm ci; \
	npm run build-prod;
	@echo "SERVER: Production build complete"

server-run: server-build
	@echo "SERVER: Running the server..."
	cd server; \
	npm ci; \
	npm run start

