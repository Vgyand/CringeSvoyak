from fastapi import APIRouter
from ..models import resp_models

from ..DB_manipulations.db import session_init
from ..DB_manipulations.db_methods2 import PackageManipulator

router = APIRouter(
    prefix='/api',
    tags=['no login'],

)


SESSION = session_init()
DBMANIPULATOR = PackageManipulator(SESSION)


@router.get('/packs/',
            response_model=resp_models.ListOfPackages,
            )
async def recive_list_of_packages(
    likes: str = None,
    downloads: str = None,
    search: str = None,
    size: str = None,
):
    '''
    Returns a list of packages
    '''
    dic = {'likes': likes,
           'downloads':  downloads,
           'search': search,
           'size': size
           }

    package_list = DBMANIPULATOR.select(dic)
    return package_list
