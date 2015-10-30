# BigApps NYC Affordable Housing Challenge - AHO App Entry

[Live Demo at http://nyc.affordablehousingonline.com](http://nyc.affordablehousingonline.com)

## 0.2.0-Alpha
>Our demo build entry for the NYC BigApps Affordable Challenge. The second version of this application, **0.2.0-Alpha**, features enhanced search functionality, detailed individual property listings, and working prototypes of our planned crowd sourcing and user dashboard tools.

#### Updates and Patches since 0.1.0
* Many Bug Fixes and Issues Resolved
* Scoped User functionality implemented including
  * User account creation and modification through **Login With Facebook**
  * Favorite A Listing Functionality
  * Detailed personal Notes
  * Improved Suggest an Edits feature
  * User Dashboard featuring notifications, personal notes, and a favorited listing quick look
  * Saved Search Profile
* Streamlined API calls and data handling
* Search Summary Additions
* Results Sorting and Pagination
* Results Card Views updated to include Maximum AMI and Housing Choice Score data points
* AHO API Updates to reflect enhanced search functionality and improve speed
* Desktop Views enhanced, including map view.

## 0.1.0-Alpha

>Active Development on AHO's entry into the BigApps NYC started on September 14th with the goal of creating a working prototype by the submission deadline of October 14th. The application is being developed with the Foundation for Apps framework and AngularJS. The first version of this application, **0.1.0-Alpha**, will feature basic search functionality, detailed individual property listings, and prototypes of a user notification dashboard, user suggested edits, and user reviews. 

###v0.1.0 Alpha Features

####Property Search
* Allow a user to find matching properties based on Borough, Household Size, Monthly Income, Disability Status, and Age
* Results of user search is presented in a familiar "card" style that will highlight the most important information about the property
* Affordable Housing Program Eligibility Card based on search criteria
* Actionable Items Prototype

####Property Details
* Neighborhood and Borough
* Affordability Information including property funding progams and any associated income or rent limitiations. (data compiled and curated by AHO)
* Unit type and maximum rent breakdowns
* Public, Private, and Charter schools within a small radius of the property including GreatSchools rankings and links. (data retrieved through GreatSchools API)
* Maintanance Code Violations (data made available by NYC Open Data)
* An expandable map with plottable school locations (data provided by GreatSchools)
* Suggest An Edit crowdsourcing prototype
* Add A Review crowdsourcing prototype

#### Housing Choice Score™
* Affordable Housing Online's proprietary score that scores each census tract on its socioeconomic opportunity helping families determine the best neighborhoods to live in.
* Informative content on a per property basis for renters on why and how a property received it's Opportunity Score.

####User Notification Dash Working Demo
* A series of user oriented, actionable notifications.
* Sitewide And Account Notification (ex. "Update your Search Preferences for tailored search results!")
* Favorited Property Update Notification (ex. "A property you favorited has new information available!")
* Matched Property Update Notification (ex. "We found a property that matches your preferences!")
* Recommended Property Notification (ex. "We suggest you check out a property that we hand selected")
