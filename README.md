# Sample SOAP server and SOAP client (cloud app)

## SOAP Server

To start, from soapServer folder, run: grunt serve

This will start a simple SOAP server listening on port 8001.
To view the wsdl visit http://localhost:8001/ws/DataManager?wsdl

The provided wsdl is very simple, it exposes a single method, getCategories

To test this with soapUI,create a new SOAP project.

![alt text](./soapServer/screenshots/newProject.png "New project creation")