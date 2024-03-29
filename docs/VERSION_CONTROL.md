Version Control 
===============

We use git for the code version control.

The server is a self-hosted gitlab version available on [gitlab](https://gitlab.com).
Locally you can use the git client you prefer, Some recommended git client: GitKraken, SourceTree, TortoiseGit 

> Note that we are using the Gitflow

Gitflow
-------

> The following is the gitflow described by Atlassian and designed by Vincent Driessen. 

Gitflow Workflow is a Git workflow that defines a strict branching model 
designed around the project release. This provides a robust framework for 
managing larger projects. 

### Basic principles ###

Instead of a single `master` branch, this workflow uses two branches 
to record the history of the project.
* `master`: The master branch stores the official release history, it will be related to the production environment.
* `develop`: The develop branch serves as an integration branch for features, it will be related to the development environment.

### Feature Branches ###

Each new feature should reside in its own branch, 
which can be pushed to the central repository for backup/collaboration. 

But, instead of branching off of `master`, `feature` branches use `develop` as their parent branch. 
When a feature is complete, it gets merged back into `develop`. 

> Features should never interact directly with `master`.

### Release Branches ###

Once develop has acquired enough features for a `release` 
(or a predetermined release date is approaching), 
you fork a `release` branch off of `develop`. 
Creating this branch starts the next release cycle, 
so no new features can be added after this point - **only bug fixes**, 
_documentation generation_, and other _release-oriented tasks_ 
should go in this branch. 
Once it's ready to ship, the `release` branch gets merged into `master` 
and **tagged with a version number**. 
In addition, it should be merged back into `develop`, 
which may have progressed since the release was initiated.

### Hotfix Branches ###

Maintenance or `hotfix` branches are used to quickly patch production releases.
Hotfix branches are a lot like `release` and `feature` branches 
except they're based on `master` instead of `develop`. 

> This is the only branch that should fork directly off of `master`. 

As soon as the fix is complete, it should be merged into 
both `master` and `develop` (or the current `release` branch), 
and `master` should be **tagged with an updated version number**.

Naming Convention
-----------------

### Commits ###

Commit messages serve at least to speed up the reviewing process, 
help write a release note and find out why a particular change was made to the code.

Write the summary line and description of _what you have done_ in the **imperative mode**, 
that is as if you were commanding someone.

Start the line with:

* Add
* Update
* Upgrade
* Remove
* Fix
* Refactor
* Setup

> Example: `Fix issue #123`

### Branches ###

Branches name should be very short (12 characters).

Branches `feature` should be named like `feature\identify` where : **identify** is the id of the task in the project management tool (jira, redmine ...)

> Example: `feature\180`

Branches `release` should be named like `release\version`

> Example: `release\1.2.0`

Branches `hotfix` should be named like `hotfix\version`

> Example: `hotfix\1.2.2`

### Tags ###

After each merge of branches `release` and `hotfix` into both `develop` and `master`, 
a tag must be created with the name of the current version.

> Example: `1.1.2` or `1.0.0`