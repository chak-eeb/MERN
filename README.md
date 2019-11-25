First we crate the gitignore file and add node_modules to it.
Then we npm init to create the package.json file.
Then we install our dependencies and dev-dependencies.
we create the "main file" >> server.js
We then create the config folder and in it the default.js and db.js
both of those files are used to connect to our DB in atlas.
After this we create the routes folder, it will have 4 files: users.js -- posts.js
--profile.js and auth.js

we then define our routes this way:
app.use('/api/users', require('./routes/api/users'));
so that we can replace: /api/users above by: '/' in
router.get('/', (req, res) => res.send('user route')); for example

When we created the routes folder we added the api folder within it because
all those routes will return json files for our api.

in order to interact with our database we need to create a model for each of our resources.
the models files names start with a capital letter.
in those models we create a schema for each one of our resources. like user for example
what information we need the user to fill: name, email, password..etc and then we export it.

in the users.js file when handling errors we use if(!errors.isEmpty()){}
that means if the opposite of errors which is no errors is empty meaning there are no errors.
then we use this :
return res.status(400).json({ errors: errors.array() });
return a status 400 which means we have errors somewhere and a json file containing all the errors
such as 'please enter a valid email'.
this is what we get if we enter only the name:
{
"errors": [
{
"msg": "please enter a valid email",
"param": "email",
"location": "body"
},
{
"msg": "Enter a password with atleast 8 characters",
"param": "password",
"location": "body"
}
]
}
