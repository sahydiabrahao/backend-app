# ✅ Checklist – FindUserByUsername

## 🧩 DOMAIN

- [ ] `find-user-by-username.protocol.ts`

## ⚙️ APPLICATION

- [ ] `find-user-by-username.use-case.ts`
- [ ] Test: should call FindUserByUsername with correct input
- [ ] Test: should throw if FindUserByUsername throws
- [ ] Test: should return user on success

## 🛠️ INFRA (Mongo)

- [ ] `find-user-by-username.mongo-adapter.ts`
- [ ] Test: should call MongoClient with correct input
- [ ] Test: should throw if MongoClient throws
- [ ] Test: should return user on success
- [ ] Test: should return null if user is not found
