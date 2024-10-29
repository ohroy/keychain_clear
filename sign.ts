#!/usr/bin/env bun
import { $, file, write } from "bun";
import plist from "plist";

const args = process.argv.slice(2);
if (args.length != 1) {
  throw new Error("args error");
}
const app = args[0];
const appFile = file(app);

if (!(await appFile.exists())) {
  throw new Error("app not exist");
}
// 解析这个plist
const result = await $`ldid -e ${app}`.text();
const ent = plist.parse(result) as any;
let keychainArray: Array<string> = [];
keychainArray.push(ent["application-identifier"] as string);
if (ent["keychain-access-groups"]) {
  keychainArray = keychainArray.concat(ent["keychain-access-groups"]);
}
if (ent["com.apple.security.application-groups"]) {
  keychainArray = keychainArray.concat(
    ent["com.apple.security.application-groups"]
  );
}
console.log(keychainArray);
var json = {
  "keychain-access-groups": keychainArray,
  "platform-application": true,
  "com.apple.private.security.no-container": true,
};
const newPlist = plist.build(json);

await write("sign.plist", newPlist);
