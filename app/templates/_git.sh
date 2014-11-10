git init

git add .bowerrc
git add .gitignore
git add .jshintrc
git add Makefile
git add README.md
git add bower.json
git add common
git add config.rb
git add data
git add globeproject.sublime-project
git add gulpfile.js
git add middleware.json
git add package.json
git add gulp
git add parts

<% if (includeLicense) { %>
git add LICENSE.md
<% } %>

git commit -m 'first commit'

echo "Do you wish to upload the project to GitHub or Bitbucket (private repo)?"
select gbn in "GitHub" "Bitbucket" "None"; do
	case $gbn in
		GitHub ) hub create BostonGlobe/<%= _.slugify(projectName) %> -p; git push -u origin master; break;;
		Bitbucket ) read -p "Bitbucket Username: " username; read -s -p "Bitbucket Password: " pwd; echo ""; curl --user $username:$pwd https://api.bitbucket.org/1.0/repositories/ --data name=<%= _.slugify(projectName) %> --data is_private='true'; git remote add origin https://$username@bitbucket.org/$username/<%= _.slugify(projectName) %>.git; git push -u origin master; break;;
		None ) break;;
	esac
done

cd parts; make setup; cd ../;

unzip node_modules; rm -f node_modules.zip;

npm install;

echo ""
echo "NOTE: Run <yo globeproject:graphic> to add a new graphic to your project."