require 'sinatra'
require 'sinatra/reloader' if development?
require 'slim'
require 'sass'
require './song'
require 'bcrypt'

configure do
  enable :sessions
  set :username, 'frank'
  # created via BCrypt::Password.create('sinatra')
  set :password, BCrypt::Password.new("$2a$10$JPascqlC73SnW5troEOjBOs14gIxEQJJ4U6OwZrJIhxqPpVVlM1VO")
end

get('/styles.css') { scss :styles }

get '/' do
  slim :home
end

get '/login' do
  slim :login
end

post '/login' do
  # order matters since settings.password is a BCrypt::Password
  if settings.username == params[:username] && settings.password == params[:password]
    session[:admin] = true
    redirect to('/songs')
  else
    slim :login
  end
end

get '/logout' do
  session.clear
  redirect to('/login')
end

get '/about' do
  @title = "All About This Website"
  slim :about
end

get '/contact' do
  slim :contact
end

not_found do
  slim :not_found
end