from project_module import project_object, image_object, link_object, challenge_object

p = project_object('floorplan', 'Floorplan')
p.domain = 'http://www.aidansean.com/'
p.path = 'floorplan'
p.preview_image    = image_object('%s/images/project.jpg'   %p.path, 150, 250)
p.preview_image_bw = image_object('%s/images/project_bw.jpg'%p.path, 150, 250)
p.folder_name = 'aidansean'
p.github_repo_name = 'floorplan'
p.mathjax = False
p.tags = 'Tools'
p.technologies = 'canvas,HTML,JavaScript'
p.links.append(link_object(p.domain, 'floorplan', 'Live page'))
p.introduction = 'This was a quickly written project to help me rearrange the furniture in my new apartment.  This project has scope for a lot of further development in the future.'
p.overview = '''Furniture is modeled using rectangles (future versions may have more sophisticated shapes) and can be dragged around on an HTML canvas.  Initially collision detection was implemented and items of furniture were not allowed to intersect.  However this was removed as it impeded the movement of shapes.  The user can drag around items of furniture, with event listeners keeping track of the actions of the user.

The challenges for this project had already been overcome in previous projects.  These include collision detection of rectangles, allowing the user to interact with shapes on the canvas, and writing a custom markup language to keeping track of the shapes.'''
