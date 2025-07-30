# ✅ Checklist – FindUserByUsername

## 🧩 DOMAIN

- [x] `find-user-by-email.protocol.ts`

## ⚙️ APPLICATION

- [x] `find-user-by-email.use-case.ts`
- [x] Test: should call FindUserByUsername with correct input
- [x] Test: should throw if FindUserByUsername throws
- [x] Test: should return user on success

## 🛠️ INFRA (Mongo)

- [x] `find-user-by-email.mongo-adapter.ts`
- [x] Test: should call MongoClient with correct input
- [x] Test: should throw if MongoClient throws
- [x] Test: should return user on success
- [x] Test: should return null if user is not found
