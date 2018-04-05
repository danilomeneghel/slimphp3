<?php

use \App\Middleware\AuthMiddleware;
use \App\Middleware\GuestMiddleware;

//__ Visible Page for all
$app->get('/contact', 'HomeController:contact')->setName('contact');

//__ Visible page when we're not logged
$app->group('', function() use ($app) {
    $this->get('/auth/signup','AuthController:getSignUp')->setName('auth.signup');
    $this->post('/auth/signup','AuthController:postSignUp');

    $this->get('/auth/signin','AuthController:getSignIn')->setName('auth.signin');
    $this->post('/auth/signin','AuthController:postSignIn');
})->add(new GuestMiddleware($container));

//__ Visible page when we're logged
$app->group('', function() use ($app) {
    $app->get('/', 'HomeController:index')->setName('home');
    $app->get('/page1', 'HomeController:page1')->setName('page1');
    $app->get('/page2', 'HomeController:page2')->setName('page2');

    $this->get('/auth/signout','AuthController:getSignOut')->setName('auth.signout');

    $this->get('/auth/password/change','PasswordController:getChangePassword')->setName('auth.password.change');
    $this->post('/auth/password/change','PasswordController:postChangePassword');
})->add(new AuthMiddleware($container));
