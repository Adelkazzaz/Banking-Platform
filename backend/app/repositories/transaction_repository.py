from typing import Optional, List
from motor.motor_asyncio import AsyncIOMotorDatabase
from app.models.transaction import Transaction

class TransactionRepository:
    def __init__(self, db: AsyncIOMotorDatabase):
        self.db = db
        self.collection = db.transactions

    async def create(self, transaction: Transaction) -> Transaction:
        transaction_dict = transaction.model_dump()
        await self.collection.insert_one(transaction_dict)
        return transaction

    async def get_by_id(self, transaction_id: str) -> Optional[Transaction]:
        transaction = await self.collection.find_one({"id": transaction_id})
        if transaction:
            return Transaction(**transaction)
        return None

    async def get_by_account(self, account_number: str, limit: int = 10, offset: int = 0) -> List[Transaction]:
        query = {
            "$or": [
                {"fromAccount": account_number},
                {"toAccount": account_number}
            ]
        }
        transactions = await self.collection.find(query).sort("timestamp", -1).skip(offset).limit(limit).to_list(length=limit)
        return [Transaction(**tx) for tx in transactions]

    async def count_by_account(self, account_number: str) -> int:
        query = {
            "$or": [
                {"fromAccount": account_number},
                {"toAccount": account_number}
            ]
        }
        return await self.collection.count_documents(query)

    async def get_all(self, limit: int = 10, offset: int = 0, type: Optional[str] = None) -> List[Transaction]:
        query = {}
        if type:
            query["type"] = type
            
        transactions = await self.collection.find(query).sort("timestamp", -1).skip(offset).limit(limit).to_list(length=limit)
        return [Transaction(**tx) for tx in transactions]

    async def count(self, type: Optional[str] = None) -> int:
        query = {}
        if type:
            query["type"] = type
            
        return await self.collection.count_documents(query)

    async def get_total_transactions(self) -> int:
        return await self.collection.count_documents({})
