from flask_restful import Resource
from app.models.Skill import Skill
from app.models.Category import Category

class SkillList(Resource):
    def get(self):
        skills_data = Skill.query.join(Category).all()  # Ensure Skill has query property

        #print(skills_data)

        #for skill in skills_data:
        #    print(skill.category)

        result = [
            {
                'skill_id': skill.id,
                'skill_name': skill.name,
                'category_name': skill.category.name,
                'category_color': skill.category.color
            } for skill in skills_data
        ]
        return result
