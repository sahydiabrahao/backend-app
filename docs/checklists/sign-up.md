# ✅ Checklist – SignUp

## 🧩 DOMAIN

- [ ] `sign-up.protocol.ts`

## ⚙️ APPLICATION

- [ ] `sign-up.use-case.ts`
- [ ] Test: should call CheckUserByEmail with correct email
- [ ] Test: should throw if CheckUserByEmail throws
- [ ] Test: should throw if email already exists
- [ ] Test: should call HashPassword with correct input
- [ ] Test: should throw if HashPassword throws
- [ ] Test: should call SaveUser with hashed password
- [ ] Test: should throw if SaveUser throws
- [ ] Test: should return user on success
