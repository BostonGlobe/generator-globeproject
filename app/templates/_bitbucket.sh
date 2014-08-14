git init

git add css
git add html
git add js
git add parts

<% if (includeMobileTemplate) { %>
git add img
<% } %>

git add .bowerrc
git add .gitignore
git add .jshintignore
git add .jshintrc
git add bower.json
git add globegraphic.sublime-project
git add gulpfile.js
git add package.json
git add README.md
git add Makefile
git add data/

<% if (includeLicense) { %>
git add LICENSE.md
<% } %>

git add config.rb

git commit -m 'first commit'

echo "Do you wish to upload the project to GitHub or Bitbucket (private repo)?"
select gbn in "GitHub" "Bitbucket" "None"; do
	case $gbn in
		GitHub ) hub create BostonGlobe/<%= _.slugify(graphicName) %> -p; git push -u origin master; break;;
		Bitbucket ) read -p "Bitbucket Username: " username; read -s -p "Bitbucket Password: " pwd; echo ""; curl --user $username:$pwd https://api.bitbucket.org/1.0/repositories/ --data name=<%= _.slugify(graphicName) %> --data is_private='true'; git remote add origin https://$username@bitbucket.org/$username/<%= _.slugify(graphicName) %>.git; git push -u origin master; break;;
		None ) break;;
	esac
done

echo "Done. Make sure to run <bower install> & <npm install> next."