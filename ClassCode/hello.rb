# 10/17/2018

print 'Hello, from Ruby!'
# print('Hello, from Ruby!')
puts "Hello, from Ruby!"

puts 'Here is a literal single-quoted string including the newline \n wee!'
puts "Here is a literal double-quoted string including the newline \n wee!"

lang = 'Ruby'
msg = "In #{lang} evaluated string, here is the result of 3 + 5 = #{3 + 5}"
puts msg
# puts "In #{lang} evaluated string, here is the result of 3 + 5 = #{3 + 5}"
# print "In #{lang} evaluated string, here is the result of 3 + 5 = #{3 + 5}"
# puts 'In #{lang} evaluated string, here is the result of 3 + 5 = #{3 + 5}'

puts "3 + 5 = " + (3 + 5).to_s
print "3 + 5 = ", 3 + 5

puts 4.class
puts 4.methods

x = 4
if x == 4
  puts 'x is 4'
else
  puts 'x is NOT 4'
end

puts 'x is still 4' if x == 4
# puts 'x is still NOT 4' if x != 4
puts 'x is still NOT 4' unless x == 4

x = 5
unless x == 4
  puts 'x is not 4'
else
  puts 'x is 4'
end

# Truthiness
# looping using number methods
puts
puts '-' * 70
puts "truthiness"

puts '1 is true' if 1
puts '0 is true' if 0
s = 'asdfjadskfasf'
puts "#{s} is true" if s
puts '""' if ''
puts 'nil is true' if nil
puts 'true is true' if true
puts 'false is true' if false

puts "true and false: #{true and false}"
puts "true or false: #{true or false}"
puts "true && false: #{true && false}"
puts "true || false: #{true || false}"

# puts "undefined_var: #{undefined_var}"
puts "true || undefined_var: #{true || undefined_var}"

puts 'hi'

# Loops
# looping using number methods
puts
puts '-' * 70
puts "loops"

x = 0
while x < 10
  x += 1
  puts x
end

puts "\nWhile expression"
x = x + 1 while x < 10
puts x

x = x - 1 until x == 1
puts x

# looping using number methods
puts
puts '-' * 70
puts "looping using number methods"
4.times do |i|
  puts "Hi, i = #{i}"
end

4.times { puts "Hello" }
4.times { |i| puts i }

puts 'upto'
5.upto(10) do |i|
  puts i
end

puts "\ndownto"
10.downto(3) do |i|
  puts i
end

# puts
# 1.upto(10) do |i|
#   i = i - 1
#   puts i
# end

puts "\nstep"
# step!
5.step(20, 5) { |i| puts i }

=begin
This is
a multi-
line comment
=end

# puts "What's your name? "
# name = gets.chomp
# puts "#{name} is a stupid name"

# arrays
puts
puts '-' * 70
puts "arrays"
anims = ['lions', 'tigers', 'bears']
anims = %w{lions tigers bears}
puts anims
print anims
puts

puts anims[0]
puts anims[100]
puts anims.size
# anims[100] = 'zebra'
# print anims
# puts
# puts anims.size

puts anims[-1]
puts anims[-2]
# (anims.size - 1).downto(0) do |i|
#   puts anims[i]
# end
puts "\nUsing negative indexing to print anims backwards"
-1.downto(-anims.size + 1) do |i|
  puts "anims[#{i}] = #{anims[i]}"
end
puts

puts anims[0..1]
puts (0..1).class