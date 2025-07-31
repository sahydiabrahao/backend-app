# ✅ Checklist – SaveUser

## 🧩 DOMAIN

- [x] `save-user.protocol.ts`

## ⚙️ APPLICATION

- [ ] `save-user.use-case.ts`
- [ ] Test: should call SaveUser with correct input
- [ ] Test: should throw if SaveUser throws
- [ ] Test: should return user on success

## 🛠️ INFRA (Mongo)

- [ ] `save-user.mongo-adapter.ts`
- [ ] Test: should call MongoClient with correct input
- [ ] Test: should throw if MongoClient throws
- [ ] Test: should return user on success
- [ ] Test: should return null if user is not found
