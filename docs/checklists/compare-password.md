# ✅ Checklist – ComparePassword

## 🧩 DOMAIN

- [x] `compare-password.protocol.ts`

## ⚙️ APPLICATION

- [x] `compare-password.use-case.ts`
- [x] Test: should call ComparePassword with correct input
- [x] Test: should throw if ComparePassword throws
- [x] Test: should return false if password is invalid
- [x] Test: should return true on success

## 🛠️ INFRA (BCrypt)

- [x] `compare-password.bcrypt-adapter.ts`
- [x] Test: should call bcrypt.compare with correct input
- [x] Test: should throw if bcrypt.compare throws
- [ ] Test: should return false if password is invalid
- [ ] Test: should return true on success
