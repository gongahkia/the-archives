PYTHON_VERSION=3.11.5
INSTALL_DIR=/usr/local/python$(PYTHON_VERSION)
TAR_FILE=Python-$(PYTHON_VERSION).tgz
DOWNLOAD_URL=https://www.python.org/ftp/python/$(PYTHON_VERSION)/$(TAR_FILE)

all: build

python_install: $(TAR_FILE) configure
	cd Python-$(PYTHON_VERSION) && make -j$(nproc)
	cd Python-$(PYTHON_VERSION) && sudo make altinstall

$(TAR_FILE):
	wget $(DOWNLOAD_URL)

Python-$(PYTHON_VERSION): $(TAR_FILE)
	tar -xzf $(TAR_FILE)

configure: Python-$(PYTHON_VERSION)
	cd Python-$(PYTHON_VERSION) && ./configure --prefix=$(INSTALL_DIR)

config: python_install
	@echo "installing Pygame as a dependancy..."
	sudo pip install pygame

build: src/main.py
	@python3 src/main.py

.PHONY: clean
clean:
	rm -rf Python-$(PYTHON_VERSION) $(TAR_FILE)

.PHONY: uninstall
uninstall:
	sudo rm -rf $(INSTALL_DIR)y
