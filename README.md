# Final Project Planning

## Models

### Wireframe
https://www.figma.com/file/gxnJZxnfgyEOFxXr1c3V3v/Pill-popper?node-id=2%3A23

### ERD
https://app.diagrams.net/#G11XnTpn527XG-SrhhKbyg9ziJlCg-m373

## USER STORIES

### User / subuser (ex. parent may have a child)

### user selects medication
-  medication data
  - drug name
  - recommended dose
  - daily intervals
  - warnings * maybe *
  - with food?
  - do not exceed!
  - optional?
  - refills
  - end date optional

### schedule gets auto filled 
- automatically set intervals

### user can browse calendar

### edit and delete mediction

### user gets notified
- take medication
- refill medication

### ¿Map to local pharmacies?
### call emergency number
### input field for fever / symptoms

## Routes

### Users
- get users/:id/medications;

### Children
- get users/:id/children
- post users/:id/children/new

### medication
- get /medications/:id
- post /medications/:childId/new
- delete medications/:id/delete
- edit medications/:id/edit

## Components
- calendar (Andrew)
- dayList (list of medications for the chosen day) (Olivia)
- dayList item (Olivia)
- childList (plus add child form)
- form (add medication) (Paul)
- nav bar (Paul)
- confirmation
- status