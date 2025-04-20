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
        active_users = await self.user_repository.get_active_users_count()
        
        total_transactions = await self.transaction_repository.get_total_transactions()
        transaction_volume = await self.transaction_repository.get_total_volume()
        
        total_loans = await self.loan_repository.get_total_loans()
        pending_loans = await self.loan_repository.get_loans_by_status("pending")
        approved_loans = await self.loan_repository.get_loans_by_status("approved")
        total_loan_amount = await self.loan_repository.get_total_loan_amount()

        return {
            "total_users": total_users,
            "active_users": active_users,
            "total_transactions": total_transactions,
            "transaction_volume": transaction_volume,
            "total_loans": total_loans,
            "pending_loans": len(pending_loans) if pending_loans else 0,
            "approved_loans": len(approved_loans) if approved_loans else 0,
            "total_loan_amount": total_loan_amount,
        }

    async def get_transaction_chart_data(self, days: int = 14):
        """
        Get transaction data grouped by day for the chart
        """
        # Calculate the start date (days ago from now)
        from datetime import datetime, timedelta
        
        end_date = datetime.now()
        start_date = end_date - timedelta(days=days)
        
        # Get transactions within the date range
        transactions = await self.transaction_repository.get_transactions_in_date_range(start_date, end_date)
        
        # Initialize result array with one entry per day
        result = []
        for i in range(days):
            day = end_date - timedelta(days=days-i-1)
            result.append({
                "date": day.strftime("%Y-%m-%d"),
                "count": 0,
                "volume": 0
            })
            
        # Aggregate transactions by date
        for transaction in transactions:
            transaction_date = transaction.createdAt.strftime("%Y-%m-%d")
            
            # Find the matching day in our result array
            for day_data in result:
                if day_data["date"] == transaction_date:
                    day_data["count"] += 1
                    day_data["volume"] += transaction.amount
                    break
        
        return result
