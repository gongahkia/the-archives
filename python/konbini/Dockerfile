FROM ubuntu:22.04

ENV PYTHON_VERSION=3.11.5
ENV INSTALL_DIR=/usr/local/python${PYTHON_VERSION}
ENV TAR_FILE=Python-${PYTHON_VERSION}.tgz
ENV DOWNLOAD_URL=https://www.python.org/ftp/python/${PYTHON_VERSION}/${TAR_FILE}

RUN apt-get update && \
    apt-get install -y wget build-essential libssl-dev libbz2-dev libreadline-dev libsqlite3-dev libffi-dev zlib1g-dev && \
    apt-get clean

RUN wget ${DOWNLOAD_URL} && \
    tar -xzf ${TAR_FILE} && \
    cd Python-${PYTHON_VERSION} && \
    ./configure --prefix=${INSTALL_DIR} && \
    make -j$(nproc) && \
    make altinstall && \
    cd .. && \
    rm -rf Python-${PYTHON_VERSION} ${TAR_FILE}

ENV PATH="${INSTALL_DIR}/bin:${PATH}"

RUN curl -O https://bootstrap.pypa.io/get-pip.py && \
    python3.11 get-pip.py && \
    pip install pygame && \
    rm get-pip.py

WORKDIR /app

COPY src/ .

CMD ["python3", "main.py"]
