# BigApps NYC Affordable Housing Challenge - AHO App Entry

[Live Demo at http://nyc.affordablehousingonline.com](http://nyc.affordablehousingonline.com)

### --Dev Patch-- ####
* app.js has been split into controller, directive, and factory directories.

### 0.1.4-Alpha Patch
* Search Summary Additions
* Results Sort

### 0.1.3-Alpha Patch
* Search Parameter Retention hotfix. Detailed in issues #62 and #63

### 0.1.2-Alpha Patch
* All Search Parameters now affect results.
* Results Card Views updated to include Maximum AMI and Housing Choice Score
* AHO API Updates to reflect enhanced search functionality.

### 0.1.1-Alpha Patch
#### 27 Issues Closed Including
* Ordinal rankings for Housing Choice Score
* Missing Fields fixes
* Desktop Views enhanced, including map view.
* Get Directions Link Added 

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


### Proposed Features for 0.2.0-Alpha

#### User Account
* Login with Facebook/Google
* Create Set of Search Preferences
* Favorite Property
* Take Note About Property
* Dynamic User Centric Notifiactions

#### Property Search
* Extended Filter Functionality on Results Page
* Extended Sorting Functionality on Results Page

#### Property Details
* Completed Suggest an Edit Feature
* Completed Add A Review Feature
* Nearby Points of Interest Integration (Grocery, Laundry, Day Care, etc)
