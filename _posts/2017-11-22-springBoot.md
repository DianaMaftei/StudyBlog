---
layout: post
title: Creating Your First Spring Boot Application
category: video
date: '2017-11-22'
sources:
  - name: Creating Your First Spring Boot Application - Pluralsight
    url: https://www.pluralsight.com/courses/spring-boot-first-application
tags:
  - Spring
  - Spring Boot
---
{::options parse_block_html="true" /}
<div class="postBody">
{::options parse_block_html="true" /}
<div class="tocContainer">
<h2 class="contents">Contents</h2>
1. TOC
{:toc}
</div>

## What is Spring Boot?
>*Spring Boot aims to make it easy to create Spring-powered, production-grade applications and services with minimum fuss. It takes an opinionated view of the Spring platform so that new and existing users can quickly get to the bits they need.*
> --  Phil Webb and Dave Syer on spring.io/blog

Spring Boot is a lightweight Spring framework designed to help users quickly bootstrap and develop a Spring application, with very little configuration needed.

## Spring Boot Dependency Management
- create a Maven project and in the parent section add:

```
<parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-parent</artifactId>
    <version>1.3.1.RELEASE</version>
</parent>
```

- Spring Boot integrates Spring MVC and auto configures it for us
- there is no need to specify a version, because the parent defined the dependency and its versions

```
 <dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>

```
- in the directory `src/main/java/{packages}` create a class **App.java** with a standard **main** method
- add `@SpringBootApplication` annotation - this tells Spring to scan the application for Spring components and auto-wires most of the Spring libraries we want to use by enabling auto-configuration
- in the **main** method add: `SpringApplication.run(App.class, args)`
- run the app like a normal Java application
- to use Spring MVC create a controller class and add `@RestController` above the class declaration
- add `@RequestMapping` above the methods inside it
- there is no need for Tomcat - it’s embedded

<span class="alert-box success">
    <span class="alert-icon" ><i class="fa fa-check-circle" aria-hidden="true"></i></span>
    <span class="alert-message">We now have a running Spring web app. This is the minimum setup needed to get an app started.</span>
</span>

- Spring Boot calls its intelligent collection of dependencies the **BOM** (Bill of materials)
- Spring libraries are matched up to contain compatible versions that work with each other, solving the problem of the user having to personally figure out library compatibility
- when we added the `spring-boot-starter-parent` dependency to our Maven build file, it brought in all the dependency management
- the starter parent also sets up other defaults like plugins, the Java minimum support version, resource filtering, and so on

## Other Spring Boot Initializers
- Spring offers other tools to make starting a project even easier:

**Web initializer** - [http://start.spring.io](http://start.spring.io) - makes it easy to generate a new project, and select a bunch of options to get up and running really quick

**Command line** - Spring Boot CLI - the CLI tools call out the same back-end API that the website does, so it’s just another way of using the initializer, but from a command line

**Examples** - clone or copy one of the Spring Boot example projects on the Spring Boot GitHub repo

## How does Spring Boot work?
- the application is started from a simple Java class using a standard `public static void main(String[] args)` method
- Spring Boot initializes the Spring context that comprises the Spring app and then honors any auto-config initializers, configuration, and annotations that direct how to initialize and start up the Spring context
- an embedded servlet container is started and auto-configured (this is done under the covers and removes the need for a **web.xml**)
- Spring chose **Tomcat** as the default servlet container, but there are options to swap out with **Jetty**, or change configuration options, such as the server port
- the `@SpringBootApplication` annotation replaces the need to declare `@Configuration`, `@EnableAutoConfiguration` and `@ComponentScan`
- `@ComponentScan` tells Spring Boot and Spring to look for any Spring components, such as controllers, services, repositories, or any other Spring components, starting in the package of **App.java**, and recursively looking through all sub packages from there

<span class="alert-box warning">
    <span class="alert-icon" ><i class="fa fa-exclamation-triangle" aria-hidden="true"></i></span>
    <span class="alert-message">If you place your main application class in a nested subfolder below your other app folders, the ComponentScan won’t be able to find the Spring components, it’s best to keep the main class at the top level of your main package structures</span>
</span>

## Why move to containerless deployments?
**With a standard container:**
- you bundle up your application and deploy it to a container running on a server somewhere
- a container needs to be set up and configured for each environment (production, stage, test); this is independent of your actual application, and it’s much like provisioning a database for each of these environments
- you need to provide some deployment descriptors so the container understands how to deploy and serve up your application - typically with **web.xml**, so the servlet container knows how to set up your application so it can be accesses via the HTTP protocol
- any app environmental configuration needs to be set up and agreed upon by the application and the container -> using JNDI, or container environment properties or settings - external to the application and is configured in the container

**With a container embedded inside of the app:**
- when the app is ready for deployment you only need to find an environment that is capable of running the correct version of Java that your app runs on; this removes any pre-container setup steps and many cloud environments can easily run Java - you no longer need to find a hosting env. that supports **JBoss**, **WebLogic** or **Tomcat**
- no longer need a deployment descriptor - the app., along with Spring Boot, direct the embedded servlet container how to set up the app so that it can be accessed via HTTP
- the auto-configuration handles most of this, but you can change behavior using the Spring Boot property files
- all the environment configuration is bundled and handled with your application
- easier debugging and testing

## Creating Web Apps

- Spring Boot has several areas that it will, by default, serve static content from; these areas can be overridden if needed, but generally one of the default locations will suffice for most web applications
- in `src/main` add a folder called **resources**; this `src/main/resources` is a Maven construct that puts anything in this onto the *classpath*
- copy static resources inside `/resources/public`
- create needed controllers, services and models
- annotate the controllers with `@RestController` and `@RequestMapping` for the base value of the controller
- annotate the methods that will handle CRUD operations with `@RequestMapping` with a value and a method type
- all the methods and code in the controller is pure Spring MVC code - nothing fancy that Spring Boot is doing here
- what Spring Boot is doing is handling the integration of Spring MVC,and setting up the **Jackson JSON** library, so that when we send info across the HTTP connection, Spring Boot and Spring MVC are automatically marshalling the JSON info into and out of the Java objects

## Spring MVC Integration Overview
- Spring Boot sets up some Spring MVC features for us:
- sets up some **ViewResolvers** automatically - content negotiating ViewResolver which determines how to respond based off of the content type (set up the Jackson JSON library to handle content negotiation views for our application JSON types)
- Spring Boot configured and told Spring MVC that it should serve out static resources that are located at the root of the *classpath*, in the *static*, *public* or *resources* path
- Spring Boot set up some standard Spring MVC **HTTPMessageConverters** so that it can use sensible defaults to convert JSON objects into Java ones and vice versa - the basic string encoding is set to *UTF-8* out of the box
- Spring Boot leaves you with some programmable, customizable hooks to give you full control over how Spring MVC is integrated

## Properties and Environmental Configuration
- many of the application settings and behavior can be adjusted and modified using the **application.properties** file
- place on *classpath* root and Spring Boot will load it and apply any of the property configuration to your application when it starts up
- you can place it in multiple places but the *classpath* is the easiest
- in a Maven-enabled project, the easiest place is `src/main/resources`
- the application properties can also be in **YAML** format - if you have the **SnakeYAML** dependency on your *classpath*
- in addition to the standard **application.properties** file, you can also define additional property files that have a profile embedded in the name of the file - **application-{profile}.properties** -> **application-dev.properties**
- the profile-specific property files will be loaded over the main **application.properties** file and any environment-specific properties will be overridden

## Configuring Apps with Properties

- adjust the logging level in the app so you can debug
 ```
 logging.level.org.springframework.web=DEBUG
 ```
- change the server port used with the embedded servlet container
```
server.port=8181
```
- to configure a profile - in Run Configurations, set up a VM argument => **-Dspring.profiles.active=test**
- you can find a list of common application properties on the [docs.spring.io](https://docs.spring.io/spring-boot/docs/current/reference/html/common-application-properties.html) website

## Configuring and Accessing a Data Source
```
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-jpa</artifactId>
</dependency>

// add dependency to the database of your choice
```

- **spring-boot-starter-data-jpa** added dependencies for **Hibernate**, **JDBC**, **JPA** and so on
- with Spring Boot we can configure our **DataSource** with the **application.properties** file
- it also tries to automatically set up your **DataSource** pooling for you - if Spring detects and of the common pooling libraries on your *classpath*, the auto-configuration will integrate that pool and tie it in with your data source
- when the **spring-boot-starter-data-jpa dependency** was added, that dependency transitively pulled in the **tomcat-jdbc** pooling library - default for Spring Boot
- other pools Spring Boot will integrate with are **HikariCP**, **Commons-DBCP** and **Commons-DBCP2**.

In **application.properties**:

```
spring.datasource.url=...
spring.datasource.username=..
spring.datasource.password=..
spring.datasource.driver-class-name=...

//Database pooling properties
spring.datasource.max-active=..
spring.datasource.maxidle=..
spring.datasource.max-wait=..
spring.datasource.min-evictable-idle-time-millis=..
spring.datasource.min-idle=...
spring.datasource.time-between-eviction-runs-millis=...

```

## Flyway

- get the dependency on the *classpath*
- Spring Boot needs to make sure that **DataSource** is available for Flyway
- it will typically use the default **DataSource** you set up, but you also have some options to configure and alternative DataSource for Flyway

```
<dependency>
    <groupId>org.flywaydb</groupId>
    <artifactId>flyway-core</artifactId>
</dependency>
```

- create directories on the *classpath* **db/migration**
- create migration scripts

<span class="alert-box warning">
    <span class="alert-icon" ><i class="fa fa-exclamation-triangle" aria-hidden="true"></i></span>
    <span class="alert-message">flywaySQL is database dependent</span>
</span>

- in **application.properties** add `flyway.baseline-on-migration=true` to tell Flyway that if this is the first time that Flyway has ever been run, it should go ahead and create the migration metadata table
- also add `spring.jpa.hibernate.ddl-auto=false` -> Hibernate by default will try to auto-create any entities using the DDL of those entities (this property will turn that feature off)

## Spring Boot Java Configuration
- if you find you need to do some configuration of your application that falls outside of the auto-configuration option you can use Java config classes
- this allows us to programmatically handle any kind of app configuration needed to take place on app startup
- use `@Configuration` annotation on the class and `@Bean` and `@ConfigurationProperties` on the config method
- if we define multiple **DataSources**, we can use the `@Primary` annotation to set the primary DataSource to be used

## Testing the Spring Boot Project

```
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-test</artifactId>
    <scope>test</scope>
</dependency>

```

- this will include **JUnit**, **Hamcrest**, **Mockito** and Spring test tools

### Integration Testing Challenges:

| Traditional Spring Apps | Spring Boot Apps |
|:--------:|:-------:|
| Containers are difficult to test  | No container, easier to start app   |
| Spring context needs to be available   | Spring context auto configuration   |
| App/Test startup can be slow   | App/Test startup can be slow   |
| Database state needs to be consistent   | Database state needs to be consistent   |
{: rules="all"}

## Integration Testing
- annotate the test with `@RunWith(SpringJUnit4ClassRunner.class)`
- add the `@SpringApplicationConfiguration()` annotation and provide the main boot class for the app
- for web integration tests, also add `@WebIntegrationTest`