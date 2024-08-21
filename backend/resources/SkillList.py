from flask_restful import Resource
from ..models import Skill
from ..models import Category

class SkillList(Resource):
    def get(self):
        skills_data = Skill.query.join(Category, Category.id == Skill.category_id).all()
        result = [
            {
                'skill_id': skill.id, 
                'skill_name': skill.name, 
                'category_name': skill.category.name, 
                'category_color': skill.category.color
            }
            for skill in skills_data
        ]
        return result
