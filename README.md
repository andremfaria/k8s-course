# k8s-course

## Namespaces 

- Namespaces are a way to divide cluster resources between multiple users.
    - It can be very useful when leading multiple different teams that use the same cluster to develop.
    - You can limit CPU/Memory usage per namespace.
- Secrets cannot be shared across namespaces.
- Services can be shared across namespaces using `name-of-the-service.<namespace>`.
- You can set the namespace inside the YAML file or in the command line:
    - `kubectl create -f file.yaml --namespace=namespace-name`
- There is a tool that easily switches between namespaces: `kubens`
    - `kubens namespace-name`

## Ingress

- Ingress controllers are used to expose services to the outside world.
- This example uses the Nginx Ingress Controller.
- You can choose another.
- Locally we can add it by:
    - `minikube addons enable ingress`

## Helm 

- Helm is a package manager for Kubernetes.
- Use case:
    - Elastic stack

### Helm chart structure

- The `chart.yaml` file contains metadata about the chart, such as the name, version, and description.
- The `values.yaml` file contains default values for the chart.
- `helm install <chart-name>` installs a chart.
- Useful to use the same command for multiple environments.

## Volumes

- `kind: PersistentVolume`
- Needs physical storage, an external NFS server, or cloud storage.
- Persistent volumes are not namespaced.
- Persistent volume claim component.
- Pod claims a persistent volume through PVC.
- `configMap` and `secret` are local volumes but are not created via PV and PVC.
- To simplify things, there is StorageClass. Provisioner: `kubernetes.io/aws-ebs`.
    - Is an abstraction
    - POD -> PVC -> StorageClass -> Provisioner

## StatefulSets

- It has a stable IP address, contrary to pods that are ephemeral.
- Load balancing.
- Loose coupling.
- within and outside the cluster.


### Type of services

#### ClusterIp Services

Default type. 
Ingress -> Service -> Pods
Pods are identified via selectors.
Service targetPort is the pod exported port. 

In the minikube we are using the `minikube service <service-name>` to expose the service to the outside world. I believe that it is doing the same thing as the ingress in the description above.


#### Multi-Port Services

- When it has 2 ports (or more) opened.
- You have to name each port on the service.yaml 

#### Headless Services
- Client wants to communicate with 1 specific pod Directly.
- Use case when it is Stateful application like databases, message queues, etc.  For example to talk with the master database node. 
- Client can find the pod ip address via DNS lookup.
- `clusterIP: None` in the service.yaml file.

#### NodePort Services
- Exposes the service on each node's IP at a static port.
- The service is accessible at `<NodeIP>:<NodePort>`.
- It is not recommended for production as it opens a lot of the ports to the world.
- Creates a port in each worker_node that it is accessible from the outside world.

#### LoadBalancer Services
- NodePort and ClusterIP services are created automatically. 

#### Wrap-up
- Configure ingress or provider load balancer for the production environment. 