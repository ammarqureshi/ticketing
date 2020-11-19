# ticketing

www.ticket-me-now.xyz

A ticketing app running on K8s cluster deployed to Digital Ocean(had free credits there :)) 





# Deployment

workflows/deploy-auth.yaml file takes care of the deployment. 

Once the code is merged to master, the script will build the modules and push the images to docker hub. Once the images have been pushed to docker hub, we need to reach out to K8s clsuter and tell the Deployments in the cluster to use the new images pushed to Docker hub.
With doctl running on the Github container, we will fetch the k8s context and feed it to kubectl which connects to the digital ocean cluster. 

![DGOCEAN-DEPL](https://user-images.githubusercontent.com/17296281/99703622-3b638580-2a8f-11eb-9001-2faed989188c.png)



# Domain Name Configuration
The load balancer has a digital IP assigned to it by digital ocean. This load balancer is directing traffic to our cluster. Have to buy a domain name and point it to the IP allocated by Digital Ocean.


![DO-CLUSTER](https://user-images.githubusercontent.com/17296281/99705356-854d6b00-2a91-11eb-92b8-69513f33eac6.jpg)


![DOMAIN](https://user-images.githubusercontent.com/17296281/99705630-e37a4e00-2a91-11eb-8904-3f63a7245395.png)

