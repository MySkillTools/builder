from flask import request
from flask_restful import Resource
from models.Skill import Skill
from models.Category import Category

class SkillList(Resource):

    """
        Resource representing a list of skills, optionally paginated and searchable.

        This endpoint provides access to a list of skills, each associated with their respective category.
        It optionally supports pagination and search through query parameters.

        Query Parameters:
            page (int, optional): The page number of the results to fetch.
            per_page (int, optional): The number of items to display per page.
            search (str, optional): A search term to filter skills by name.
            category (str, optional): Filter skills by category name.

        Returns:
            JSON object containing a list of skills with their associated category details. If pagination is used,
            additional pagination information is included. If pagination parameters are not provided, all skills
            are returned along with the total count of matching skills.
    """

    """
        API Testing Endpoints for the SkillList Resource
        Base URL: http://localhost:5000/skillList

        1. Fetch All Skills without Pagination or Search
        - URL: GET http://localhost:5000/skillList
        - Description: Retrieves all skills with their associated category details without pagination and without any search or category filters.

        2. Fetch All Skills with Pagination
        - URL: GET http://localhost:5000/skillList?page=1&per_page=10
        - Description: Retrieves the first page of skills, with 10 skills per page. Pagination information is included in the response.

        3. Fetch Skills with Search Term
        - URL: GET http://localhost:5000/skillList?search=Python
        - Description: Retrieves skills whose names contain the term "Python". Pagination is not applied in this example.

        4. Fetch Skills with Category Filter
        - URL: GET http://localhost:5000/skillList?category=Programming
        - Description: Retrieves skills associated with the category named "Programming". Pagination is not applied in this example.

        5. Fetch Skills with Search Term and Category Filter
        - URL: GET http://localhost:5000/skillList?search=Java&category=Programming
        - Description: Retrieves skills whose names contain "Java" and are in the "Programming" category. Pagination is not applied in this example.

        6. Fetch Skills with Search Term and Pagination
        - URL: GET http://localhost:5000/skillList?search=Java&page=2&per_page=5
        - Description: Retrieves the second page of skills whose names contain "Java", with 5 skills per page. Pagination information is included in the response.

        7. Fetch Skills with Category Filter and Pagination
        - URL: GET http://localhost:5000/skillList?category=Development&page=1&per_page=10
        - Description: Retrieves the first page of skills in the "Development" category, with 10 skills per page. Pagination information is included in the response.
        """

    def get(self):
        # Get query parameters
        page = request.args.get('page', type=int)
        per_page = request.args.get('per_page', type=int)
        search = request.args.get('search', type=str)
        category = request.args.get('category', type=str)

        # Start with base query
        query = Skill.query.join(Category)

        # Apply search filter if provided
        if search:
            query = query.filter(Skill.name.ilike(f'%{search}%'))

        # Apply category filter if provided
        if category:
            query = query.filter(Category.name.ilike(f'%{category}%'))

        # Calculate total count of all matching skills
        total_count = query.count()

        # Pagination parameters provided, apply pagination
        if page and per_page:
            paginated_skills = query.paginate(page=page, per_page=per_page, error_out=False)
            skills_data = paginated_skills.items

            result = [{
                'id': skill.id,
                'name': skill.name,
                'category': skill.category.name,
                'color': skill.category.color
            } for skill in skills_data]

            pagination_info = {
                'count': total_count,
                'pages': paginated_skills.pages,
                'current_page': paginated_skills.page,
                'per_page': paginated_skills.per_page
            }
            return {'skills': result, 'pagination': pagination_info}

        # No valid pagination parameters, fetch all
        else:
            skills_data = query.all()
            result = [{
                'id': skill.id,
                'name': skill.name,
                'category': skill.category.name,
                'color': skill.category.color
            } for skill in skills_data]

            # Treat "fetch all" as a single page with all available records.
            pagination_info = {
                'count': total_count,
                'pages': 1,
                'current_page': 1,
                'per_page': total_count
            }

            return {'skills': result, 'pagination': pagination_info}