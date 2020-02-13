#include <bitcoin/bitcoin.hpp>
using namespace bc;

int main()
{
  eliptic_curve_key key;
  key.new_pair();
  secret_parameter secret = key.secret();
  std::cout << secret_to_wif(secret) << std::endl;
  return 0;
}


