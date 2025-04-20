from fastapi import Depends
from app.repositories.user_repository import UserRepository
from app.repositories.transaction_repository import TransactionRepository
from app.repositories.loan_repository import LoanRepository

class AdminService:
    def __init__(
        self,
        user_repository: UserRepository = Depends(),
        transaction_repository: TransactionRepository = Depends(),
        loan_repository: LoanRepository = Depends()
    ):
        self.user_repository = user_repository
        self.transaction_repository = transaction_repository
        self.loan_repository = loan_repository

    async def get_admin_dashboard_stats(self):
        total_users = await self.user_repository.get_total_users()
        total_transactions = await self.transaction_repository.get_total_transactions()
        total_loans = await self.loan_repository.get_total_loans()

        return {
            "total_users": total_users,
            "total_transactions": total_transactions,
            "total_loans": total_loans,
        }
