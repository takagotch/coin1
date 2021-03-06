
#include <future>
#include <bitcoin/bitcoin.hpp>

using namespace bc;

int main(int argc, char** argv)
{
  if (argc != 2)
  {
    std::cerr << "initchain: No directory specified." << std::endl;
    return 1;
  }
  const std::string dbpath = argv[1];

  threadpool pool(1);

  leveldb_blockchain chain(pool);

  auto blockchain_start = [](const std::error_code& ec) {};

  chain.start(dbpath, blockchain_start);

  block_type first_block = genesis_block();
  std::promise<std::error_code> ec_promise;

  auto import_finished = 
    [&ec_promise](const std::error_code& ec)
    {
      ec_promise.set_value(ec);
    };

  chain.import(first_block, 0, import_finished);

  std::error_code ec = ec_promise.get_future().get();
  if (ec)
  {
    log_error() << "Importing genesis block failed: " << ec.message();
    return -1;
  }
  log_info() << "Imported genesis block "
    << hash_block_header(first_block.header);
  pool.stop();
  pool.join();
  chain.stop();
  return 0;
}



