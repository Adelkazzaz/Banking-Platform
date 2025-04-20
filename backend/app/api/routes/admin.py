from fastapi import APIRouter, Depends, HTTPException, status
from typing import Optional

from app.models.user import UserInDB, User
from app.models.transaction import TransactionsResponse
from app.models.loan import LoanResponse, LoansResponse
from app.services.user_service import UserService
from app.services.transaction_service import TransactionService
from app.services.loan_service import LoanService
from app.api.dependencies import get_user_service, get_transaction_service, get_loan_service, get_current_admin, get_admin_service

router = APIRouter()

@router.get("/users", response_model=dict)
async def get_all_users(
    limit: int = 10,
    offset: int = 0,
    current_user: UserInDB = Depends(get_current_admin),
    user_service: UserService = Depends(get_user_service)
):
    users = await user_service.get_all_users(limit, offset)
    total = await user_service.count_users()
    
    # Convert UserInDB to User (remove password)
    user_list = [
        User(
            id=user.id,
            email=user.email,
            firstName=user.firstName,
            lastName=user.lastName,
            accountNumber=user.accountNumber,
            balance=user.balance,
            createdAt=user.createdAt,
            role=user.role
        ) for user in users
    ]
    
    return {
        "users": user_list,
        "total": total,
        "limit": limit,
        "offset": offset
    }

@router.get("/transactions", response_model=TransactionsResponse)
async def get_all_transactions(
    limit: int = 10,
    offset: int = 0,
    type: Optional[str] = None,
    current_user: UserInDB = Depends(get_current_admin),
    transaction_service: TransactionService = Depends(get_transaction_service)
):
    transactions, total = await transaction_service.get_all_transactions(limit, offset, type)
    
    return TransactionsResponse(
        transactions=transactions,
        total=total,
        limit=limit,
        offset=offset
    )

@router.get("/transactions/chart")
async def get_transaction_chart_data(
    days: int = 14,
    current_user: UserInDB = Depends(get_current_admin),
    admin_service = Depends(get_admin_service)
):
    """
    Get transaction data grouped by day for charts
    """
    chart_data = await admin_service.get_transaction_chart_data(days)
    
    return {
        "success": True,
        "data": chart_data
    }

@router.get("/loans", response_model=LoansResponse)
async def get_all_loans(
    limit: int = 10,
    offset: int = 0,
    status: Optional[str] = None,
    current_user: UserInDB = Depends(get_current_admin),
    loan_service: LoanService = Depends(get_loan_service)
):
    loans, total = await loan_service.get_all_loans(limit, offset, status)
    
    return LoansResponse(
        loans=loans
    )

@router.put("/loans/{loan_id}/approve", response_model=LoanResponse)
async def approve_loan(
    loan_id: str,
    current_user: UserInDB = Depends(get_current_admin),
    loan_service: LoanService = Depends(get_loan_service)
):
    success, message, loan = await loan_service.approve_loan(loan_id)
    
    return LoanResponse(
        success=success,
        message=message,
        loan=loan
    )

@router.put("/loans/{loan_id}/reject", response_model=LoanResponse)
async def reject_loan(
    loan_id: str,
    current_user: UserInDB = Depends(get_current_admin),
    loan_service: LoanService = Depends(get_loan_service)
):
    success, message, loan = await loan_service.reject_loan(loan_id)
    
    return LoanResponse(
        success=success,
        message=message,
        loan=loan
    )
