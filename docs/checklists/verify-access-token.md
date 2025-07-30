# ✅ Checklist – VerifyAccessToken

## 🧩 DOMAIN

- [x] `verify-access-token.protocol.ts`

## ⚙️ APPLICATION

- [ ] `verify-access-token.use-case.ts`
- [x] Test: should call VerifyAccessToken with correct input
- [x] Test: should throw if VerifyAccessToken throws
- [ ] Test: should return payload on success

## 🛠️ INFRA (JWT)

- [ ] `verify-access-token.jwt-adapter.ts`
- [ ] Test: should call jwt.verify with correct input
- [ ] Test: should throw if jwt.verify throws
- [ ] Test: should return payload on success
- [ ] Test: should return null if token is invalid or expired
