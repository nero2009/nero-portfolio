---
path: /fix-boringssl-grpc-unsupported-option
date: 2025-01-11
title: Fix BoringSSL GRPC unsupported option '-G' for target arm64-apple-ios on Xcode 16
author: Nero Adaware
description: Fix BoringSSL GRPC unsupported option '-G' for target arm64-apple-ios on Xcode 16
---


Fix:

Old firebase versions use GRPC with BoringSSL. And the latest version of Xcode 16 does not support the '-G' option for the target arm64-apple-ios.

So you need to update your firebase version to the latest version([v21.0.0](https://github.com/invertase/react-native-firebase/blob/main/packages/app/CHANGELOG.md#2100-2024-09-26) or above) to use the latest version of BoringSSL.

```
npm install @react-native-firebase/app@21.0.0
npm install @react-native-firebase/OTHER_FIREBASE_PACKAGE_YOU_ARE_USING@21.0.0

```

Install pods, you might need to update your pods to the latest version.

```
cd ios

pod install
```

This will fix the issue.
