# Changelog

## 🚀 Release `@adnbn/plugin-reg-cs` v0.5.1 (2025-10-22)


### 🛠️ Refactoring

* **background:** remove trailing commas in error logging functions ([4c85ce9](https://github.com/addon-stack/plugin-reg-cs/commit/4c85ce9f507ecf3c9587d55db70cfff4427e1c3a))


* **background:** streamline permission handling and improve error logging ([b5e8f31](https://github.com/addon-stack/plugin-reg-cs/commit/b5e8f318d6a5a191e15fc516f5c50011084431fb))





### 🙌 Contributors

- [Addon Stack](https://github.com/addon-stack) (@addon-stack) — 3 commits

## 🚀 Release `@adnbn/plugin-reg-cs` v0.5.0 (2025-10-21)


### ✨ Features

* enhance register content scripts logic with checking permissions ([681cfb3](https://github.com/addon-stack/plugin-reg-cs/commit/681cfb33075d59c5b7ed195d322cb8ef5043384e))




### 📝 Documentation

* update README for improved clarity on plugin behavior and permissions ([2eae875](https://github.com/addon-stack/plugin-reg-cs/commit/2eae8750b27692fec96c037f59b4fe24ebe66401))

  - Clarified content script activation flow and error handling.
  - Expanded details on required permissions and their usage.
  - Added additional troubleshooting steps for common issues.



### 🧩 Other

* format code ([a367ab3](https://github.com/addon-stack/plugin-reg-cs/commit/a367ab37f18d7f2483f731e2c9d9217b4551b8be))




### 🧹 Chores

* **dependencies:** update dependencies and devDependencies in `package-lock.json` ([764f84a](https://github.com/addon-stack/plugin-reg-cs/commit/764f84a98147aac984d3e27c9a3491c70990dce9))




### 🛠️ Refactoring

* **background:** improve permissions handling and event cleanup logic ([a8a7916](https://github.com/addon-stack/plugin-reg-cs/commit/a8a79167926a81ceb92f0d4ae68dea6b527807e1))

  - Extracted `permissions` to a reusable constant for cleaner code.
  - Refined `onPermissionsAdded` callback to ensure proper cleanup after use.
  - Updated condition checks to enhance code clarity and maintainability.




### 🙌 Contributors

- [Addon Stack](https://github.com/addon-stack) (@addon-stack) — 5 commits
- [Rostyslav Nihrutsa](rostyslav.nihrutsa@gmail.com) — 3 commits

## 🚀 Release `@adnbn/plugin-reg-cs` v0.4.0 (2025-10-17)


### ✨ Features

* add Husky hooks for commit message validation, pre-commit checks, and pre-push tests ([b00b960](https://github.com/addon-stack/plugin-reg-cs/commit/b00b960312ed3af7510ac8777a5eaa65cbea9a62))


* enhance TypeScript config and project setup ([c7d6e44](https://github.com/addon-stack/plugin-reg-cs/commit/c7d6e44b5008cbc77c197fa5e0c61f81391ebb1d))


* migrate from Prettier to Biome for formatting and linting configuration ([904d8e8](https://github.com/addon-stack/plugin-reg-cs/commit/904d8e8370965f49e52a2b8faeef7d7fbfe10c8f))




### 📝 Documentation

* add SECURITY.md and LICENSE.md, update README badges ([7bc9b43](https://github.com/addon-stack/plugin-reg-cs/commit/7bc9b434a78e4cc134583c9bd060c53e4f970c44))

  - Added a SECURITY.md for reporting vulnerabilities and disclosure practices.
  - Added LICENSE.md with the MIT license details.
  - Updated README with new badges for CI and license links.



### 🤖 CI

* add release automation with release-it and GitHub Actions ([73c8d6a](https://github.com/addon-stack/plugin-reg-cs/commit/73c8d6abc43c3632fd849a995400e386dcc6469a))




### 🧹 Chores

* **deps:** update dependencies ([c38c85b](https://github.com/addon-stack/plugin-reg-cs/commit/c38c85bbea4f1a51637ddec4cdb011d620f409ec))


* update dependencies and devDependencies in `package-lock.json` ([66f2ad5](https://github.com/addon-stack/plugin-reg-cs/commit/66f2ad55ac1e50b31bada83c324fa899d0b6367d))




### 🛠️ Refactoring

* optimize tab injection logic in `background.ts` ([953b5ce](https://github.com/addon-stack/plugin-reg-cs/commit/953b5ce6fb8b9edf3fea92daa47b67418a2530c5))

  - Consolidated reusable tab filtering with `isInjectableTab` helper.
  - Enhanced code readability and structure by reducing redundancy in tab injection processes.




### 🙌 Contributors

- [Addon Stack](https://github.com/addon-stack) (@addon-stack) — 10 commits
- [Rostyslav Nihrutsa](rostyslav.nihrutsa@gmail.com) — 1 commits
