{
        we first create a user model first
        `npx sequelize model:generate --name User --attributes email:string,password:string`
}

{
        here the password in the sql is not stored in password manner
        so we use sequelize hooks
        before entry of password in DB we encrypt the password
        we use bcrypt
        we use it in models 

}

{
        difference between authentication and authorisation
        authorisation : assignig functionalities and permission and capabilites
        to different rolls of different users
        

        authentication : 
        identify  are you valid user or not


}
{
        different types of authentication
        passportjs

}

{
        jwt : json web tokens
        
}
{

        api gateWay => this is the entry gate point for all api
        proxy => {
                In the context of an API Gateway, a proxy typically refers to a configuration where the gateway forwards requests directly to a backend service without significantly altering them. This is also known as a "pass-through" or "reverse proxy" pattern.

                What Does Proxy Mean in API Gateway?
                When you configure proxy integration, the API Gateway acts as a reverse proxy:

                It receives the incoming HTTP request.

                It forwards it to a backend service (like an AWS Lambda, HTTP server, or microservice).like {
                        you implent your backend at localhost:3000/api/v1/flight/bookings
                        it will call api/v1/f;ight/bookings

                        that is called as a proxy
                }

                It then returns the backend’s response to the client.


        }

        reverse Proxy =>{
                A reverse proxy is a server that sits in front of one or more backend servers, intercepting requests from clients and forwarding them to the appropriate backend. It then receives the response and sends it back to the client as if it originated from the proxy.

| Feature          | Reverse Proxy                            | Forward Proxy                                |
| ---------------- | ---------------------------------------- | -------------------------------------------- |
| Sits in front of | Backend servers                          | Clients (users)                              |
| Hides            | Backend servers                          | Clients                                      |
| Used for         | Load balancing, caching, SSL termination | Anonymity, content filtering, access control |
| Common tools     | NGINX, Apache, HAProxy, API Gateway      | Squid, browser plugins                       |

        }
}

{
        🛠️ Common Uses of a Reverse Proxy
Load Balancing
Distribute traffic across multiple backend servers to prevent overload.

SSL Termination
Handle HTTPS traffic at the proxy level, reducing CPU load on backends.

Caching
Serve frequently requested content directly, improving speed.

Security
Hide backend IPs and enforce WAF (Web Application Firewall) rules.

Centralized Authentication
Handle auth (OAuth, JWT, etc.) at the proxy before passing to backend.

API Gateway Functionality
Forward API requests to microservices (common in AWS API Gateway, Kong, NGINX).

 
}{
        An orchestration layer is a component in a system architecture responsible for coordinating and managing interactions between different services, processes, or components. It "orchestrates" workflows, meaning it controls what happens, when, and in what order, often making decisions based on business logic.

🔧 What Does an Orchestration Layer Do?
Coordinates services: Calls multiple services and handles their responses.

Implements business logic: Determines control flow across services.

Error handling & retries: Manages failures gracefully.

State management: Keeps track of workflow progress if needed.

Service composition: Combines outputs from multiple services into one response.
}

{
        API GATEWAY{
                authentication
                RateLimiting
                Autherisation
                Proxy

        }
}


{
         Implement Our Rate Limiting
        Express Rate Limiter
        install `npm i express-rate-limit`

}

{
        forward Proxy =>{
                client ----- forward Proxy -----internet ----- server
                forward proxy sits between a client and internet 
                client request a resourse from the internet through forward proxy
                which act as an intermediate layer in between them

                what content actualyy gone to the server 
                you can do filteration the content on forward proxy
                caching and access controll implemented on forward proxy


                you can maintain user anonimality ==> you do not want to expose
                what is the IP ADDRESS of user while the user makes an request to the internet
                you can acually hide this
                your forward proxy make an request on the behalf of user
                but actually client make the request

                ##DIS-ADV{
                        little bit complex to setup the forward proxy
                        if(forward Proxy Fail == > then it is a single point failure(SPF))
                        intrudicng one layer between internet and client might increase latency as well


                }

                }


        Reverse Proxy ==>{
                client ----- forward Proxy -----internet ----- Reverse PROXY  ----- server

                when request come from client it goes through internet 
                then it first roueted to reverse proxy then routes to the corresponding Server

                Reverse proxy Sits between      internet and server
                the response from server first goes to proxy then to client

                it helps us to protect origin server from direct client acess 
                helps in load balancing also
                it provides better security and provides better routing to the Request


                 ##DIS-ADV{
                        little bit complex to setup the forward proxy
                        if(forward Proxy Fail == > then it is a single point failure(SPF))
                        intrudicng one layer between internet and client might increase latency as well


                }

                Built in ==> NGNIX 
        }

}

{
        http-proxy-middleware
        built in solution
        install it `npm i http-proxy-middleware`

        use cases==>{
                user want to send to request on the service
                        user 
                          |
                          V
                //localhost:4000/bookingservice/api/v1/bookings(API GATEWAY)//---> localhost:4000/api/v1/bookings
                        if flightservice
                          |
                          V
                //localhost:4000/flightservice/api/v1/bookings(API GATEWAY)
                          |
                          V
                //localhost:5000/api/v1/flights

        }

        {
                app.use(
                '/flightsService',
                createProxyMiddleware({
                target: ServerConfig.FLIGHT_SERVICE,
                changeOrigin: true,
                // pathFilter: '/api/proxy-only-this-path',
                }),
                );
                app.use(
                '/bookingService',
                createProxyMiddleware({
                target: ServerConfig.BOOKING_SERVICE,
                changeOrigin: true,
                // pathFilter: '/api/proxy-only-this-path',
                }),
                );

                set up our Proxy Middleware
                
        }
}
