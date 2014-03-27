git init

git add css
git add html
git add js
git add parts
git add .bowerrc
git add .gitignore
git add bower.json
git add globegraphic.sublime-project
git add gulpfile.js
git add package.json
git add README.md
git add config.rb

git commit -m 'first commit'

echo "Do you wish to upload the project to GitHub or Bitbucket (private repo)?"
select gbn in "GitHub" "Bitbucket" "None"; do
	case $gbn in
	case $yn in
		GitHub ) read -p "GitHub Username: " username; read -s -p "GitHub Password: " pwd; echo ""; curl -u $username https://api.github.com/user/repos -d '{"name":"<%= _.slugify(graphicName) %>", "private":"true"}'; git remote add origin git@github.com:$username/<%= _.slugify(graphicName) %>.git; git push -u origin master; break;;
		Bitbucket ) read -p "Bitbucket Username: " username; read -s -p "Bitbucket Password: " pwd; echo ""; curl --user $username:$pwd https://api.bitbucket.org/1.0/repositories/ --data name=<%= _.slugify(graphicName) %> --data is_private='true'; git remote add origin https://$username@bitbucket.org/$username/<%= _.slugify(graphicName) %>.git; git push -u origin master; break;;
		None ) break;;
	esac
done