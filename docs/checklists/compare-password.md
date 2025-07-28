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

- [ ] `compare-password.bcrypt-adapter.ts`
- [ ] Test: should call bcrypt.compare with correct input
- [ ] Test: should throw if bcrypt.compare throws
- [ ] Test: should return true on success
- [ ] Test: should return false if password is invalid
