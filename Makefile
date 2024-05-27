export THEOS_DEVICE_IP = localhost
export THEOS_DEVICE_PORT = 2223
export ARCHS = arm64

TARGET := iphone:clang:latest:7.0

include $(THEOS)/makefiles/common.mk

TOOL_NAME = keychain_clear

keychain_clear_FILES = main.m
# keychain_clear_CFLAGS = -fobjc-arc
keychain_clear_LDFLAGS = -lsqlite3
keychain_clear_CODESIGN_FLAGS = -Ssign.plist
keychain_clear_INSTALL_PATH = /var/jb/usr/local/bin

include $(THEOS_MAKE_PATH)/tool.mk
