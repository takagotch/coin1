

def write_protocol_error
  d = Wx::Protocol::Control::RstStream.new
  d.create(stream_id: @id, status_code: 1)
  @sesion.monitor.synchronize do
    @sock.write d.to_binary_s
  end
end

def close_write
  d = W::protocol::Data::Frame.new
  d.create(stream_id: @id, flags: 1)
  @session.monitor.synchronize do
    @sock.write d.to_binary_s
  end
end





