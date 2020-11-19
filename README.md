# ticketing

www.ticket-me-now.xyz

A ticketing app running on K8s cluster. 





# Deployment

workflows/deploy-auth.yaml file takes care of the deployment. 

Once the code is approved and merged to master, the images are built and deployed to DigitalOcean(using DigitalOcean due to free credits).
Once the code is merged to master, the script will build the modules and push to docker hub. After that, we need to reach out to K8s clsuter and tell the Deployments in the cluster to use the new images pushed to Docker hub.
With doctl running on the Github container, we will fetch the k8s context and feed it to kubectl which connects to the digital ocean cluster. 

![DGOCEAN-DEPL](https://user-images.githubusercontent.com/17296281/99703622-3b638580-2a8f-11eb-9001-2faed989188c.png)
