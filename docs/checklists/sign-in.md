# ✅ Checklist – SignInProtocol

## 🧩 DOMAIN

- [x] `sign-in-protocol.protocol.ts`

## ⚙️ APPLICATION

- [x] `sign-in-protocol.use-case.ts`
- [x] Test: should call FindUserByUsername with correct input
- [x] Test: should throw if FindUserByUsername throws
- [x] Test: should throw if user is not found

- [x] Test: should call ComparePassword with correct input
- [x] Test: should throw if ComparePassword throws
- [x] Test: should throw if ComparePassword returns false

- [x] Test: should call AccessToken with correct input
- [x] Test: should throw if AccessToken throws
- [x] Test: should return token on success
