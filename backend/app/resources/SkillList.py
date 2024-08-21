from flask import request
from flask_restful import Resource
from app.models.Skill import Skill
from app.models.Category import Category

"""
    Resource representing a list of skills, optionally paginated.

    This endpoint provides access to a list of skills, each associated with their respective category.
    It optionally supports pagination through query parameters. If pagination parameters are not provided,
    all skills are returned without pagination info.

    Query Parameters:
        page (int, optional): The page number of the results to fetch.
        per_page (int, optional): The number of items to display per page.

    Returns:
        JSON object containing a list of skills with their associated category details. If pagination is used,
        additional pagination information is included. If pagination parameters are not provided, all skills
        are returned without pagination data.

    Example Response (Paginated):
        {
            "skills": [
                {
                    "skill_id": 1,
                    "skill_name": "JavaScript",
                    "category_name": "Web Development",
                    "category_color": "#ff7f50"
                },
                ...
            ],
            "pagination": {
                "total_items": 50,
                "total_pages": 5,
                "current_page": 1,
                "per_page": 10
            }
        }

    Example Response (Non-Paginated):
        {
            "skills": [
                {
                    "skill_id": 1,
                    "skill_name": "JavaScript",
                    "category_name": "Web Development",
                    "category_color": "#ff7f50"
                },
                ...
            ]
        }
"""

class SkillList(Resource):

    def get(self):
        page = request.args.get('page', type=int)
        per_page = request.args.get('per_page', type=int)

        # Pagination parameters provided, apply pagination
        if page and per_page:
            
            paginated_skills = Skill.query \
                .join(Category) \
                .paginate(page=page, per_page=per_page, error_out=False)
            skills_data = paginated_skills.items

            result = [{
                'skill_id': skill.id,
                'skill_name': skill.name,
                'category_name': skill.category.name,
                'category_color': skill.category.color
            } for skill in skills_data]

            pagination_info = {
                'total_items': paginated_skills.total,
                'total_pages': paginated_skills.pages,
                'current_page': paginated_skills.page,
                'per_page': paginated_skills.per_page
            }
            return {'skills': result, 'pagination': pagination_info}
        
        # No valid pagination parameters, fetch all
        else:
            
            skills_data = Skill.query.join(Category).all()
            result = [{
                'skill_id': skill.id,
                'skill_name': skill.name,
                'category_name': skill.category.name,
                'category_color': skill.category.color
            } for skill in skills_data]
            
            return {'skills': result}