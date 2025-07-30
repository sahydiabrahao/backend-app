# ✅ Checklist – VerifyAccessToken

## 🧩 DOMAIN

- [x] `verify-access-token.protocol.ts`

## ⚙️ APPLICATION

- [ ] `verify-access-token.use-case.ts`
- [x] Test: should call VerifyAccessToken with correct input
- [x] Test: should throw if VerifyAccessToken throws
- [x] Test: should return payload on success

## 🛠️ INFRA (JWT)

- [ ] `verify-access-token.jwt-adapter.ts`
- [x] Test: should call jwt.verify with correct input
- [x] Test: should throw if jwt.verify throws
- [x] Test: should throw if token is invalid
- [x] Test: should throw if token is expired
- [ ] Test: should return payload on success
