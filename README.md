# A Ticketing App

Hosted on : www.ticket-me-now.xyz

A ticketing microservices app using the publisher-subscriber model architecture running on k8s cluster deployed on Digital Ocean(had free credits :))
Authentication and authorization implemented with the ability for users to buy tickets that are on sale by other users. Stripe is integrated with the app(use test data). 

## Functionality of the app: 
* can signin/signup - production grade authentication
* users can list a ticket for an event for sale
* other users can purchse the tickets up for sale
* any user can list tickets for sale and purchase tickets
* when a user attemps to purchase a ticket, the ticket will be locked for 15 minutes to give enought time to enter their payment info(Stripe integrated for payment service)
* while a ticket is locked, no other user is able to purchase the same ticket. After the 15 minutes, if the ticket has not been purchase, the ticket is released for someone else to purhcase. 
* ticket prices can only be edited if they are not locked.


##  Development
These are the routes that have been implemented:

![routes](https://user-images.githubusercontent.com/17296281/99706182-9cd92380-2a92-11eb-97aa-17e382eb4ac3.png)


### Services implemented:

![services](https://user-images.githubusercontent.com/17296281/99707510-70260b80-2a94-11eb-96cb-bc1d77d0874f.png)

### Architecture Design
A common library is used amongst the different services. For this publisher-subsriber model, NATS streaming server was used for an event bus implementation.

![arch](https://user-images.githubusercontent.com/17296281/99708068-399cc080-2a95-11eb-8f5c-d24a0913c7c3.png)


##  Deployment

workflows/deploy-auth.yaml file takes care of the deployment. 

Once the code is merged to master, the script will build the modules and push the images to docker hub. 

![depl-plan](https://user-images.githubusercontent.com/17296281/99705898-42d85e00-2a92-11eb-8098-ff5c3f5e27c0.png)


Once the images have been pushed to docker hub, we need to reach out to K8s clsuter and tell the Deployments in the cluster to use the new images pushed to Docker hub.
With doctl running on the Github container, we will fetch the k8s context and feed it to kubectl which connects to the digital ocean cluster. 

![DGOCEAN-DEPL](https://user-images.githubusercontent.com/17296281/99703622-3b638580-2a8f-11eb-9001-2faed989188c.png)


##  Domain Name Configuration
The load balancer has a digital IP assigned to it by digital ocean. This load balancer is directing traffic to our cluster. Have to buy a domain name and point it to the IP allocated by Digital Ocean.


![DO-CLUSTER](https://user-images.githubusercontent.com/17296281/99705356-854d6b00-2a91-11eb-92b8-69513f33eac6.jpg)

![DOMAIN](https://user-images.githubusercontent.com/17296281/99705630-e37a4e00-2a91-11eb-8904-3f63a7245395.png)

