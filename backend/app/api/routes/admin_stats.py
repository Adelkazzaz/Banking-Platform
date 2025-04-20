from fastapi import APIRouter, Depends
from app.services.admin_service import AdminService
from app.api.dependencies import get_admin_service

router = APIRouter()

@router.get("/admin/stats")
async def get_admin_stats(admin_service: AdminService = Depends(get_admin_service)):
    stats = await admin_service.get_admin_dashboard_stats()
    return stats
